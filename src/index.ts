interface Pokemon {
    id: string;
    attack: number;
    defense: number;
}

interface BaseRecord {
    id: string;
}

interface Database<T extends BaseRecord> {
    set(newValue: T): void;
    get(id: string): T | undefined;
}

function createDabatase<T extends BaseRecord>() {
    class InMemoryDB implements Database<T> {
        private db: Record<string, T> = {};

        public set(newValue: T): void {
            this.db[newValue.id] = newValue;
        }
        public get(id: string): T | undefined {
            return this.db[id]
        }
    }
    return InMemoryDB;
}


const PokemonDB = createDabatase<Pokemon>();
const pokemonDB = new PokemonDB();

pokemonDB.set({
    id: 'Bulbasaur',
    attack: 50,
    defense: 12,
});

console.log(pokemonDB.get('Bulbasaur'));