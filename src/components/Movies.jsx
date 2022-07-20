import React, { Component } from "react";
import { getGenres } from "../services/genreServices";
import { getMovies, deleteMovie } from "../services/movieServices";
import _ from "lodash";
import Pagination from "./common/Pagination";
import { Paginate } from "./utils/Paginate";
import ListGroup from "./common/ListGroup";
import MoviesTable from "./MoviesTable";
import { Link } from "react-router-dom";
import SearchBox from "./common/SearchBar";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    pageSize: 4,
    currentPage: 1,
    searchQury: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }

  handleMovieDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });

    try {
          await deleteMovie(movie._id)

    } catch (ex) {
      if(ex.response && ex.response.status ===404)
      toast.error('this movie has being deleted');

      this.setState({movies : originalMovies})
    }

  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQury: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQury: query, selectedGenre: null, currentPage: 1 });
  };
  getPageData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQury,
      movies: allMovies,
    } = this.state;

    let filtered = allMovies;

    if (searchQury)
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQury.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = Paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { pageSize, currentPage, sortColumn, searchQury } = this.state;
const { user } = this.props;

    const { totalCount, data: movies } = this.getPageData();

    return (
      <>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
           { user && <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>}
            <p>showing { totalCount } movies in the database</p>
            <SearchBox value={searchQury} onChange={this.handleSearch} />
            <MoviesTable
              filtered={totalCount}
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleMovieDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
            />
            <Pagination
              pageSize={pageSize}
              currentPage={currentPage}
              itemsCount={totalCount}
              onPageChange={this.handlePageChange}
            />{" "}
          </div>
        </div>
      </>
    );
  }
}

export default Movies;
