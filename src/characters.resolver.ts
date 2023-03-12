import {Args, Int, Query, Resolver} from '@nestjs/graphql';
import {Character} from "./character";

@Resolver(Character)
export class CharactersResolver {
    @Query(returns => Character, { name: 'character'})
    getCharacter(@Args('id', { type: () => Int }) id: number) {
        return new Character(
            id,
            'Joel',
            'Miller'
        );
    }
}
