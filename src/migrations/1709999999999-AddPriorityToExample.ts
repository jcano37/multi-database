import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPriorityToExample1709999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const isMySql = queryRunner.connection.options.type === 'mysql';

    await queryRunner.addColumn(
      'examples',
      new TableColumn({
        name: 'priority',
        type: isMySql ? 'int' : 'integer',
        default: 0,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('examples', 'priority');
  }
}
