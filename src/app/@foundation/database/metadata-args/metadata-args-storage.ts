import { RelationMetadataArgs } from './relation-metadata-args';
import { ColumnMetadataArgs } from './column-metadata-args';
import { RelationCountMetadataArgs } from './relation-count-metadata-args';
import { IndexMetadataArgs } from './index-metadata-args';
import { EntityListenerMetadataArgs } from './entity-listener-metadata-args';
import { TableMetadataArgs } from './table-metadata-args';
import { NamingStrategyMetadataArgs } from './naming-strategy-metadata-args';
import { JoinTableMetadataArgs } from './join-table-metadata-args';
import { JoinColumnMetadataArgs } from './join-column-metadata-args';
import { EmbeddedMetadataArgs } from './embedded-metadata-args';
import { EntitySubscriberMetadataArgs } from './entity-subscriber-metadata-args';
import { RelationIdMetadataArgs } from './relation-id-metadata-args';
import { InheritanceMetadataArgs } from './inheritance-metadata-args';
import { DiscriminatorValueMetadataArgs } from './discriminator-value-metadata-args';
import { EntityRepositoryMetadataArgs } from './entity-repository-metadata-args';
import { TransactionEntityMetadataArgs } from './transaction-entity-metadata-args';
import { TransactionRepositoryMetadataArgs } from './transaction-repository-metadata-args';
import { MetadataUtils } from '../metadata-builder';
import { GeneratedMetadataArgs } from './generated-metadata-args';
import { TreeMetadataArgs } from './tree-metadata-args';
import { UniqueMetadataArgs } from './unique-metadata-args';
import { CheckMetadataArgs } from './check-metadata-args';
import { ExclusionMetadataArgs } from './exclusion-metadata-args';

/**
 * Storage all metadatas args of all available types: tables, columns, subscribers, relations, etc.
 * Each metadata args represents some specifications of what it represents.
 * MetadataArgs used to create a real Metadata objects.
 */
export class MetadataArgsStorage {

  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  readonly tables: TableMetadataArgs[] = [];
  readonly trees: TreeMetadataArgs[] = [];
  readonly entityRepositories: EntityRepositoryMetadataArgs[] = [];
  readonly transactionEntityManagers: TransactionEntityMetadataArgs[] = [];
  readonly transactionRepositories: TransactionRepositoryMetadataArgs[] = [];
  readonly namingStrategies: NamingStrategyMetadataArgs[] = [];
  readonly entitySubscribers: EntitySubscriberMetadataArgs[] = [];
  readonly indices: IndexMetadataArgs[] = [];
  readonly uniques: UniqueMetadataArgs[] = [];
  readonly checks: CheckMetadataArgs[] = [];
  readonly exclusions: ExclusionMetadataArgs[] = [];
  readonly columns: ColumnMetadataArgs[] = [];
  readonly generations: GeneratedMetadataArgs[] = [];
  readonly relations: RelationMetadataArgs[] = [];
  readonly joinColumns: JoinColumnMetadataArgs[] = [];
  readonly joinTables: JoinTableMetadataArgs[] = [];
  readonly entityListeners: EntityListenerMetadataArgs[] = [];
  readonly relationCounts: RelationCountMetadataArgs[] = [];
  readonly relationIds: RelationIdMetadataArgs[] = [];
  readonly embeddeds: EmbeddedMetadataArgs[] = [];
  readonly inheritances: InheritanceMetadataArgs[] = [];
  readonly discriminatorValues: DiscriminatorValueMetadataArgs[] = [];

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  filterTables(target: Function | string): TableMetadataArgs[];
  filterTables(target: (Function | string)[]): TableMetadataArgs[];
  filterTables(target: (Function | string) | (Function | string)[]): TableMetadataArgs[] {
    return this.filterByTarget(this.tables, target);
  }

  filterColumns(target: Function | string): ColumnMetadataArgs[];
  filterColumns(target: (Function | string)[]): ColumnMetadataArgs[];
  filterColumns(target: (Function | string) | (Function | string)[]): ColumnMetadataArgs[] {
    return this.filterByTargetAndWithoutDuplicateProperties(this.columns, target);
  }

  findGenerated(target: Function | string, propertyName: string): GeneratedMetadataArgs | undefined;
  findGenerated(target: (Function | string)[], propertyName: string): GeneratedMetadataArgs | undefined;
  findGenerated(target: (Function | string) | (Function | string)[], propertyName: string): GeneratedMetadataArgs | undefined {
    return this.generations.find(generated => {
      return (Array.isArray(target) ? target.indexOf(generated.target) !== -1 : generated.target === target) && generated.propertyName === propertyName;
    });
  }

  findTree(target: (Function | string) | (Function | string)[]): TreeMetadataArgs | undefined {
    return this.trees.find(tree => {
      return (Array.isArray(target) ? target.indexOf(tree.target) !== -1 : tree.target === target);
    });
  }

  filterRelations(target: Function | string): RelationMetadataArgs[];
  filterRelations(target: (Function | string)[]): RelationMetadataArgs[];
  filterRelations(target: (Function | string) | (Function | string)[]): RelationMetadataArgs[] {
    return this.filterByTargetAndWithoutDuplicateProperties(this.relations, target);
  }

  filterRelationIds(target: Function | string): RelationIdMetadataArgs[];
  filterRelationIds(target: (Function | string)[]): RelationIdMetadataArgs[];
  filterRelationIds(target: (Function | string) | (Function | string)[]): RelationIdMetadataArgs[] {
    return this.filterByTargetAndWithoutDuplicateProperties(this.relationIds, target);
  }

  filterRelationCounts(target: Function | string): RelationCountMetadataArgs[];
  filterRelationCounts(target: (Function | string)[]): RelationCountMetadataArgs[];
  filterRelationCounts(target: (Function | string) | (Function | string)[]): RelationCountMetadataArgs[] {
    return this.filterByTargetAndWithoutDuplicateProperties(this.relationCounts, target);
  }

  filterIndices(target: Function | string): IndexMetadataArgs[];
  filterIndices(target: (Function | string)[]): IndexMetadataArgs[];
  filterIndices(target: (Function | string) | (Function | string)[]): IndexMetadataArgs[] {
    // todo: implement parent-entity overrides?
    return this.indices.filter(index => {
      return Array.isArray(target) ? target.indexOf(index.target) !== -1 : index.target === target;
    });
  }

  filterUniques(target: Function | string): UniqueMetadataArgs[];
  filterUniques(target: (Function | string)[]): UniqueMetadataArgs[];
  filterUniques(target: (Function | string) | (Function | string)[]): UniqueMetadataArgs[] {
    return this.uniques.filter(unique => {
      return Array.isArray(target) ? target.indexOf(unique.target) !== -1 : unique.target === target;
    });
  }

  filterChecks(target: Function | string): CheckMetadataArgs[];
  filterChecks(target: (Function | string)[]): CheckMetadataArgs[];
  filterChecks(target: (Function | string) | (Function | string)[]): CheckMetadataArgs[] {
    return this.checks.filter(check => {
      return Array.isArray(target) ? target.indexOf(check.target) !== -1 : check.target === target;
    });
  }

  filterExclusions(target: Function | string): ExclusionMetadataArgs[];
  filterExclusions(target: (Function | string)[]): ExclusionMetadataArgs[];
  filterExclusions(target: (Function | string) | (Function | string)[]): ExclusionMetadataArgs[] {
    return this.exclusions.filter(exclusion => {
      return Array.isArray(target) ? target.indexOf(exclusion.target) !== -1 : exclusion.target === target;
    });
  }

  filterListeners(target: Function | string): EntityListenerMetadataArgs[];
  filterListeners(target: (Function | string)[]): EntityListenerMetadataArgs[];
  filterListeners(target: (Function | string) | (Function | string)[]): EntityListenerMetadataArgs[] {
    return this.filterByTarget(this.entityListeners, target);
  }

  filterEmbeddeds(target: Function | string): EmbeddedMetadataArgs[];
  filterEmbeddeds(target: (Function | string)[]): EmbeddedMetadataArgs[];
  filterEmbeddeds(target: (Function | string) | (Function | string)[]): EmbeddedMetadataArgs[] {
    return this.filterByTargetAndWithoutDuplicateEmbeddedProperties(this.embeddeds, target);
  }

  findJoinTable(target: Function | string, propertyName: string): JoinTableMetadataArgs | undefined {
    return this.joinTables.find(joinTable => {
      return joinTable.target === target && joinTable.propertyName === propertyName;
    });
  }

  filterJoinColumns(target: Function | string, propertyName: string): JoinColumnMetadataArgs[] {
    // todo: implement parent-entity overrides?
    return this.joinColumns.filter(joinColumn => {
      return joinColumn.target === target && joinColumn.propertyName === propertyName;
    });
  }

  filterSubscribers(target: Function | string): EntitySubscriberMetadataArgs[];
  filterSubscribers(target: (Function | string)[]): EntitySubscriberMetadataArgs[];
  filterSubscribers(target: (Function | string) | (Function | string)[]): EntitySubscriberMetadataArgs[] {
    return this.filterByTarget(this.entitySubscribers, target);
  }

  filterNamingStrategies(target: Function | string): NamingStrategyMetadataArgs[];
  filterNamingStrategies(target: (Function | string)[]): NamingStrategyMetadataArgs[];
  filterNamingStrategies(target: (Function | string) | (Function | string)[]): NamingStrategyMetadataArgs[] {
    return this.filterByTarget(this.namingStrategies, target);
  }

  filterTransactionEntityManagers(target: Function | string, propertyName: string): TransactionEntityMetadataArgs[] {
    return this.transactionEntityManagers.filter(transactionEm => {
      return (Array.isArray(target) ? target.indexOf(transactionEm.target) !== -1 : transactionEm.target === target) && transactionEm.methodName === propertyName;
    });
  }

  filterTransactionRepository(target: Function | string, propertyName: string): TransactionRepositoryMetadataArgs[] {
    return this.transactionRepositories.filter(transactionEm => {
      return (Array.isArray(target) ? target.indexOf(transactionEm.target) !== -1 : transactionEm.target === target) && transactionEm.methodName === propertyName;
    });
  }

  filterSingleTableChildren(target: Function | string): TableMetadataArgs[] {
    return this.tables.filter(table => {
      return table.target instanceof Function
        && target instanceof Function
        && MetadataUtils.isInherited(table.target, target)
        && table.type === 'entity-child';
    });
  }

  findInheritanceType(target: Function | string): InheritanceMetadataArgs | undefined {
    return this.inheritances.find(inheritance => inheritance.target === target);
  }

  findDiscriminatorValue(target: Function | string): DiscriminatorValueMetadataArgs | undefined {
    return this.discriminatorValues.find(discriminatorValue => discriminatorValue.target === target);
  }

  // -------------------------------------------------------------------------
  // Protected Methods
  // -------------------------------------------------------------------------

  /**
   * Filters given array by a given target or targets.
   */
  protected filterByTarget<T extends { target: Function | string }>(array: T[], target: (Function | string) | (Function | string)[]): T[] {
    return array.filter(table => {
      return Array.isArray(target) ? target.indexOf(table.target) !== -1 : table.target === target;
    });
  }

  /**
   * Filters given array by a given target or targets and prevents duplicate property names.
   */
  protected filterByTargetAndWithoutDuplicateProperties<T extends { target: Function | string, propertyName: string }>(array: T[], target: (Function | string) | (Function | string)[]): T[] {
    const newArray: T[] = [];
    array.forEach(item => {
      const sameTarget = Array.isArray(target) ? target.indexOf(item.target) !== -1 : item.target === target;
      if (sameTarget) {
        if (!newArray.find(newItem => newItem.propertyName === item.propertyName))
          newArray.push(item);
      }
    });
    return newArray;
  }

  /**
   * Filters given array by a given target or targets and prevents duplicate embedded property names.
   */
  protected filterByTargetAndWithoutDuplicateEmbeddedProperties<T extends EmbeddedMetadataArgs>(array: T[], target: (Function | string) | (Function | string)[]): T[] {
    const newArray: T[] = [];
    array.forEach(item => {
      const sameTarget = Array.isArray(target) ? target.indexOf(item.target) !== -1 : item.target === target;
      if (sameTarget) {
        const isDuplicateEmbeddedProperty = newArray.find((newItem: EmbeddedMetadataArgs): boolean =>
          newItem.prefix === item.prefix && newItem.propertyName === item.propertyName,
        );
        if (!isDuplicateEmbeddedProperty)
          newArray.push(item);
      }
    });
    return newArray;
  }

}
