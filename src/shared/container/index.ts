import { container } from 'tsyringe';
import RabbitConfiguration from '../../configurations/rabbit.configuration';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import UserQueue from '../../queues/user.queue.consumer';
import UserRepository from '../../repositories/user.repository';

export const rabbitIoC = async (): Promise<void> => {
    const configuration = container.resolve(RabbitConfiguration);
    const rabbit = await configuration.init();
    container.register('RabbitConnection', { useValue: rabbit.getConnection() });
};

export const queueNamesIoC = () => {
    container.register('UserQueue', { useValue: 'com.casai.v1.user.service.create' });
};

export const repositoriesIoC = () => {
    container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
};

export const bindQueueConsumersIoC = () => {
    const resolved = container.resolveAll(UserQueue);
    resolved.forEach(async consumer => {
        await consumer.bind();
    });
};
