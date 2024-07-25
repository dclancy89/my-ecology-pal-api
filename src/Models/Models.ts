export interface Location {
  id: number;
  name: string;
}

export interface DataPoint {
  id: number;
  locationId: number;
  data: any;
}

export enum DataTemplateType {
  WaterSample = 'WaterSample',
  InvasiveSpecies = 'InvasiveSpecies',
  TrailDamage = 'TrailDamage',
  AtRiskSpecies = 'AtRiskSpecies',
}
