import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
//this OneToMany refers to one orphanage to many images
import Image from './Image';

@Entity('orphanages')
export default class Orphanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(()=> Image, image=> image.orphanage, {
        cascade: ['insert', 'update']
        //cascade will automatically insert or update images from the orphanages 
    })
    @JoinColumn ({ name: 'orphanage_id' })
    images: Image[];

    //we don't use column here because this decorator isn't used as a database column
}

// It's using decorators, a concept that's know in Java and TypeScript but needs to be implemented in JavaScript