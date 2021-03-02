import AppError from '@shared/errors/AppError';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';

import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on te same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    // 25/02/2021 11:00
    const appointmentDate = new Date(2021, 1, 25, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);

    // MANEIRA FEITA NO BOOTCAMP, PORÉM PREFIRO O MODELO ABAIXO
    // PARA GARANTIR QUE ESTA RETORNANDO O ERRO TESTADO
    //
    // createAppointment
    //   .execute({
    //     date: appointmentDate,
    //     provider_id: '123123',
    //   })
    //   .catch(error => {
    //     expect(error).toBeInstanceOf(AppError);
    //     expect(error.message).toBe('This appointment is already booked');
    //   });
  });
});
