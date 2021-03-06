import { TreeRepository } from './';
import { EntityMetadata } from '../metadata';
import { Repository } from './repository';
import { QueryRunner } from '../query-runner';
import { EntityManager } from '../entity-manager';

/**
 * Factory used to create different types of repositories.
 */
export class RepositoryFactory {

    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------

    /**
     * Creates a repository.
     */
    create(manager: EntityManager, metadata: EntityMetadata, queryRunner?: QueryRunner): Repository<any> {

        if (metadata.treeType) {
            // NOTE: dynamic access to protected properties. We need this to prevent unwanted properties in those classes to be exposed,
            // however we need these properties for internal work of the class
            const repository = new TreeRepository<any>();
            Object.assign(repository, {
                manager: manager,
                metadata: metadata,
                queryRunner: queryRunner,
            });
            return repository;

        } else {
            // NOTE: dynamic access to protected properties. We need this to prevent unwanted properties in those classes to be exposed,
            // however we need these properties for internal work of the class
            let repository: Repository<any> = new Repository<any>();
            Object.assign(repository, {
                manager: manager,
                metadata: metadata,
                queryRunner: queryRunner,
            });

            return repository;
        }
    }

}
