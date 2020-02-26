import { document, field, oneToOne } from 'orm';
import { Student } from './student.model';

@document({ name: 'teacher' })
export class Teacher {

    @field({ type: 'String', required: true })
    name: string;

    @field({ type: 'Number', required: true })
    age: number;

    @oneToOne({
        targetCollection: 'student',
        relatedClass: Student,
        cascade: true,
        eager: true,
        embedded: true,
        type: 'Object',
    })
    student: Student;
}
