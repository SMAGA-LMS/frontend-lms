export interface AcademicTermDto {
  id: string;
  name: string;
}

export interface ClassPeriodDto {
  id: string;
  classPeriodName: string;
  classPeriodCode: string;
  totalStudentsEnrolled: string;
}

export interface ClassroomDto {
  classPeriod?: ClassPeriodDto;

  teacher?: any;
}
