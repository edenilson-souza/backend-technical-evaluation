import { ChangeStatusServiceUseCase } from 'src/core/application/use-cases/service/change-status-service';
import { CreateServiceUseCase } from 'src/core/application/use-cases/service/create-service';
import { GetServiceByIdUseCase } from 'src/core/application/use-cases/service/get-service-by-id';
import { GetServicesByArchitectIdUseCase } from 'src/core/application/use-cases/service/get-services-by-architect-id';
import { GetServicesByClientIdUseCase } from 'src/core/application/use-cases/service/get-services-by-client-id';
import { ListAllServicesUseCase } from 'src/core/application/use-cases/service/list-all-services';
import { SendServiceToArchitectUseCase } from 'src/core/application/use-cases/service/send-service-to-architect';
import { ServiceStatus } from 'src/core/domain/entities/service';
import { ServiceRepositoryInMemory } from 'src/core/infra/repositories/in-memory/service-repository-in-memory';

const makeServiceUseCases = () => {
  const serviceRepository = new ServiceRepositoryInMemory();

  const createService = new CreateServiceUseCase(serviceRepository);
  const getServiceById = new GetServiceByIdUseCase(serviceRepository);
  const sendServiceToArchitect = new SendServiceToArchitectUseCase(
    serviceRepository,
  );
  const changeStatusService = new ChangeStatusServiceUseCase(serviceRepository);
  const listAllServices = new ListAllServicesUseCase(serviceRepository);
  const getServicesByClientId = new GetServicesByClientIdUseCase(
    serviceRepository,
  );
  const getServicesByArchitectId = new GetServicesByArchitectIdUseCase(
    serviceRepository,
  );

  return {
    createService,
    getServiceById,
    listAllServices,
    changeStatusService,
    getServicesByClientId,
    sendServiceToArchitect,
    getServicesByArchitectId,
  };
};

describe('Service use cases', () => {
  it('A service must be created with the correct data', async () => {
    const { createService } = makeServiceUseCases();

    const input = {
      id_client: 'any id',
      description: 'any description',
    };

    const service = await createService.execute(input);

    expect(service.id_client).toBe(input.id_client);
    expect(service.id_architect).toBe(null);
    expect(service.description).toBe(input.description);
    expect(service.status).toBe('available');
  });
  it('Should search for a service by its ID', async () => {
    const { getServiceById, createService } = makeServiceUseCases();

    const input = {
      id_client: 'any id',
      description: 'any description',
    };

    const service = await createService.execute(input);
    const foundedService = await getServiceById.execute(service.id);

    expect(foundedService.id_client).toBe(input.id_client);
    expect(foundedService.id_architect).toBe(null);
    expect(foundedService.description).toBe(input.description);
    expect(foundedService.status).toBe('available');
  });
  it('Should send service to an architect', async () => {
    const { getServiceById, createService, sendServiceToArchitect } =
      makeServiceUseCases();

    const inputCreateService = {
      id_client: 'any id client',
      description: 'any description',
    };

    const service = await createService.execute(inputCreateService);

    const inputRegisterArchitect = {
      id: service.id,
      id_architect: '@any_id',
    };

    await sendServiceToArchitect.execute(inputRegisterArchitect);
    const foundedService = await getServiceById.execute(service.id);

    expect(foundedService.id_architect).toBe(
      inputRegisterArchitect.id_architect,
    );
    expect(foundedService.id).toBe(inputRegisterArchitect.id);
  });
  it('Should change the status of the service', async () => {
    const {
      getServiceById,
      createService,
      sendServiceToArchitect,
      changeStatusService,
    } = makeServiceUseCases();

    const inputCreateService = {
      id_client: 'any id client',
      description: 'any description',
    };

    const service = await createService.execute(inputCreateService);

    const inputRegisterArchitect = {
      id: service.id,
      id_architect: '@any_id',
    };

    await sendServiceToArchitect.execute(inputRegisterArchitect);
    let foundedService = await getServiceById.execute(service.id);

    expect(foundedService.id_architect).toBe(
      inputRegisterArchitect.id_architect,
    );
    expect(foundedService.id).toBe(inputRegisterArchitect.id);
    expect(foundedService.status).toBe('available');

    let inputChangeStatus = {
      id: foundedService.id,
      status: 'accepted' as ServiceStatus,
    };

    await changeStatusService.execute(inputChangeStatus);
    foundedService = await getServiceById.execute(service.id);

    expect(foundedService.status).toBe('accepted');
    expect(foundedService.id).toBe(inputRegisterArchitect.id);

    inputChangeStatus = {
      id: foundedService.id,
      status: 'refused' as ServiceStatus,
    };

    await changeStatusService.execute(inputChangeStatus);
    foundedService = await getServiceById.execute(service.id);

    expect(foundedService.status).toBe('refused');
    expect(foundedService.id).toBe(inputRegisterArchitect.id);
  });
  it('Should list all services', async () => {
    const { listAllServices, createService } = makeServiceUseCases();

    let services = await listAllServices.execute();

    expect(services.length).toBe(0);

    const inputCreateService = {
      id_client: 'any id client',
      description: 'any description',
    };

    await createService.execute(inputCreateService);
    services = await listAllServices.execute();

    expect(services.length).toBe(1);
  });
  it('Should list all services by client id', async () => {
    const { getServicesByClientId, createService } = makeServiceUseCases();

    const input = {
      id_client: 'any id client',
      description: 'any description',
    };

    let services = await getServicesByClientId.execute(input.id_client);

    expect(services.length).toBe(0);

    await createService.execute(input);
    services = await getServicesByClientId.execute(input.id_client);

    expect(services.length).toBe(1);
  });
  it('Should list all services by architect id', async () => {
    const { getServicesByArchitectId, sendServiceToArchitect, createService } =
      makeServiceUseCases();

    const inputCreateService = {
      id_client: 'any id client',
      description: 'any description',
    };

    const architectId = 'any id architect';

    let services = await getServicesByArchitectId.execute(architectId);

    expect(services.length).toBe(0);

    const service01 = await createService.execute(inputCreateService);
    const service02 = await createService.execute(inputCreateService);

    await sendServiceToArchitect.execute({
      id: service01.id,
      id_architect: architectId,
    });

    services = await getServicesByArchitectId.execute(architectId);

    expect(services.length).toBe(1);

    await sendServiceToArchitect.execute({
      id: service02.id,
      id_architect: architectId,
    });

    services = await getServicesByArchitectId.execute(architectId);

    expect(services.length).toBe(2);
  });
});
