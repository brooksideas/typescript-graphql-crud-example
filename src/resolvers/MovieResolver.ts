import {
  Resolver,
  Mutation,
  Arg,
  Int,
  Query,
  InputType,
  Field
} from "type-graphql";
import { Movie } from "../entity/Movie";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  minutes: number;
}

@InputType()
class MovieUpdateInput { 
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => Int, { nullable: true })
  minutes?: number;
}

@Resolver()
export class MovieResolver {
  // Create
  @Mutation(() => Movie)
  async createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
    const movie = await Movie.create(options).save();
    return movie;
  }
  // Read
  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }
  // Read One Movie
  @Query(() => Movie)
  async getMovie(
    @Arg("id", () => Int) id: number
  ) {
    const movie = await Movie.findOne({ where: { id } });
    return movie;
  }
  // Update
  @Mutation(() => Movie)
  async updateMovie(
    @Arg("id", () => Int) id: number,
    @Arg("input", () => MovieUpdateInput) input: MovieUpdateInput
  ) {
    await Movie.update({ id }, input);
    const updatedMovie = this.getMovie(id);
    return updatedMovie;
  }
  // Delete
  @Mutation(() => Boolean)
  async deleteMovie(@Arg("id", () => Int) id: number) {
    await Movie.delete({ id });
    return true;
  }
}
