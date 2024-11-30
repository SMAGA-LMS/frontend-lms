import Model from "@/services/model";

// export interface AcademicTermDto {
//   id: string;
//   name: string;
// }

// export interface ClassPeriodDto {
//   id: string;
//   classPeriodName: string;
//   classPeriodCode: string;
//   totalStudentsEnrolled: string;
// }

export interface ClassroomDto extends Model {
  name: string;
  grade: string;

  // TODO: nanti mesti nya kalo mau ada periode buat pembeda kelas tambah period di backend dan db
  // classPeriod?: ClassPeriodDto;
  // teacher?: any;
}
