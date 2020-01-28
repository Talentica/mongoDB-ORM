import { Field, Document } from 'orm';

@Document({ name: 'person' })
export class Person {

    @Field({ type: 'String', required: true })
    name: string;

    @Field({ type: 'Number', required: true })
    empId: number;
}
