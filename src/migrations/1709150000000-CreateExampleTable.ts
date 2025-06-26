import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExampleTable1709150000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const isMySql = queryRunner.connection.options.type === 'mysql';

    await queryRunner.createTable(
      new Table({
        name: 'examples',
        columns: [
          {
            name: 'id',
            type: isMySql ? 'varchar' : 'uuid',
            length: isMySql ? '36' : undefined,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'isActive',
            type: isMySql ? 'tinyint' : 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Para MySQL, necesitamos configurar el trigger para UUID
    if (isMySql) {
      await queryRunner.query(`
                CREATE TRIGGER before_insert_examples
                BEFORE INSERT ON examples
                FOR EACH ROW
                SET NEW.id = UUID();
            `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.connection.options.type === 'mysql') {
      await queryRunner.query('DROP TRIGGER IF EXISTS before_insert_examples');
    }
    await queryRunner.dropTable('examples');
  }
}
