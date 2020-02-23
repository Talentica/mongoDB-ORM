import { document, field, OneToOne } from 'orm';
import { Student } from './student.model';

@document({ name: 'teacher' })
export class Teacher {

    @field({ type: 'Number', required: true })
    id: number;

    @field({ type: 'String', required: true })
    name: string;

    @OneToOne({ targetCollection: 'Hello', cascade: true, eager: true, embedded: true, type: 'OneToOne' })
    test: Student;
}
