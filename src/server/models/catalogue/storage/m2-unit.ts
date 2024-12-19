import {BaseUnitDbo, BaseUnitDto} from '.';
import { M2 } from '..';

export interface M2UnitDto extends BaseUnitDto {
    expansionCard: M2.ExpansionCardDto;
}

export interface M2UnitDbo extends BaseUnitDbo {
    expansionCard: M2.ExpansionCardDbo;
}