import { RawRuleOf } from '@casl/ability';
import { AppAbility } from '../services/Ability';

export interface User {
    name?: string
    role?: string
    id?:number
    username?:string,
    password?:string
    permissions?: RawRuleOf<AppAbility>[]
}

