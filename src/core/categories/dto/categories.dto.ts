export enum Status {
  Active = "active",
  Inactive = "inactive",
}

export class CreateCategoryDto {
  id: string;
  name: string;
  status: Status;
  created_at: Date;
  updated_at: Date;
}
