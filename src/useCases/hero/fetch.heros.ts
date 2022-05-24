import { UseCase } from "../i.use-cases";


export class FetchHerosUc implements UseCase {
    async execute(...args: any): Promise<any> {
        return [
                {
                    name: 'Bruce',
                    age: 45
                }
            ]
        
    }
}