import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateContactDto } from './create-contact.dto';

describe('CreateContactDto', () => {
  it('accepts and normalizes a valid contact request', async () => {
    const dto = plainToInstance(CreateContactDto, {
      name: '  Edwin Rodríguez  ',
      email: 'edwin@example.com',
      subject: 'Propuesta laboral',
      message: 'Quisiera conversar sobre una oportunidad de desarrollo.',
      website: '',
    });

    await expect(validate(dto)).resolves.toHaveLength(0);
    expect(dto.name).toBe('Edwin Rodríguez');
  });

  it('rejects invalid email and undersized content', async () => {
    const dto = plainToInstance(CreateContactDto, {
      name: 'E',
      email: 'correo-invalido',
      subject: 'Hi',
      message: 'Corto',
    });

    const errors = await validate(dto);
    expect(errors.map(({ property }) => property).sort()).toEqual([
      'email',
      'message',
      'name',
      'subject',
    ]);
  });
});
