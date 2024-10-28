export interface CreateEnrollmentDto {
  userId: string | null;   // The ID of the user enrolling in the course
  courseId: number; // The ID of the course to enroll in
}
