import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ListProjectsQueryDto } from './list-projects-query.dto';

describe('ListProjectsQueryDto', () => {
  it('accepts optional category and technology filters', async () => {
    const dto = plainToInstance(ListProjectsQueryDto, {
      category: 'Aplicaciones web',
      technology: 'TypeScript',
    });

    await expect(validate(dto)).resolves.toHaveLength(0);
  });

  it('rejects filters longer than the public API limit', async () => {
    const dto = plainToInstance(ListProjectsQueryDto, {
      technology: 'x'.repeat(101),
    });

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0]?.property).toBe('technology');
  });
});
