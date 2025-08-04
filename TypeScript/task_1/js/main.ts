export interface Teacher {
	readonly firstName: string,
	readonly lastName: string,
	fullTimeEmployee: boolean,
	yearsOfExperience?: number,
	location: string,
	[key: string]: any,
}

interface Directors extends Teacher {
	numberOfReports: number
}



class StudentClass {
	firstName: string;
	lastName: string;

	constructor(firstName: string, lastName: string) {
		this.firstName = firstName;
		this.lastName = lastName;
	}

	workOnHomework(): string {
		return 'Currently working'
	}

	displayName(): string {
		return this.firstName;
	}
}

export interface StudentConstructor {
	new(firstName: string, lastName: string): StudentClass;
}

export interface StudentClassInterface {
	firstName: string,
	lastName: string,
	workOnHomework(): string,
	displayName(): string
}
