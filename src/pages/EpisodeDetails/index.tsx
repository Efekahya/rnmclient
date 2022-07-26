import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Link, useLocation } from "react-router-dom";

import { ReactComponent as Arrow } from "../../assets/arrow.svg";
import { ReactComponent as Globe } from "../../assets/globe.svg";

import AddFavorites from "../../components/AddFavorites";
import CharacterList from "../../components/CharacterList";
import ShowCount from "../../components/ShowCount";

import { GetEpisode } from "../../queries/queries";
import { ICharacter, ILocation } from "../../types/interfaces";
import { FavoriteContext } from "../../context/favoriteContext";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function EpisodeDetails() {
  const [locationsArray, setLocationsArray] = React.useState<ILocation[]>([]);
  const [uniqueLocations, setUniqueLocations] = React.useState<JSX.Element[]>(
    []
  );
  const [showMore, setShowMore] = React.useState(false);
  const [id, setId] = React.useState<string>("");
  const favoritedItems = useContext(FavoriteContext);

  const location = useLocation();
  useEffect(() => {
    setId(window.location.href.split("/")[4]);
    setLocationsArray([]);
    setUniqueLocations([]);
  }, []);

  const { loading, error, data, refetch } = useQuery(GetEpisode, {
    variables: {
      id: location.pathname.split("/")[2]
    }
  });

  useEffect(() => {
    refetch({
      id: location.pathname.split("/")[2]
    });
  }),
    [id];
  useEffect(() => {
    if (loading === false && data) {
      setLocationsArray(prevState => {
        prevState = data.episode.characters.map((element: ICharacter) => {
          return {
            name: element.location.name,
            dimension: element.location.dimension,
            type: element.location.type
          };
        });
        return prevState;
      });
    }
  }, [loading, data]);

  useEffect(() => {
    if (loading === false && data) {
      setUniqueLocations(prevState => {
        prevState = Array.from(
          new Map<string, ILocation>(
            locationsArray.map((x: ILocation) => [x["name"], x])
          ).values()
        )
          .filter(x => {
            return x.name !== "unknown";
          })
          .map(({ name, type, dimension }) => {
            return (
              <>
                <div className="location-container">
                  <div className="location-title">
                    <div className="location-name">
                      <div className="location-globe">
                        <Globe />
                      </div>

                      {name}
                    </div>
                    <div className="location-type">{type}</div>
                  </div>
                  <div className="location-dimension">{dimension}</div>
                </div>
              </>
            );
          });
        return prevState;
      });
    }
  }, [loading, data, locationsArray]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p>Error :(</p>;

  return (
    <div className="episode-detailsPage-main">
      <div className="episode-detailsPage-frame">
        <div className="episode-detailsPage-container">
          <div className="episode-detailsPage-goBack">
            <Link to="/episodes">
              <Arrow className="arrow" />
              Episode List
            </Link>
          </div>
          <div className="episode-detailsPage-selectEpisode">
            <Link to={`/episodes/${data.episode.id - 1}`}>
              <Arrow className="arrow" />
            </Link>
            <div className="episode-detailsPage-episodeText">
              {data.episode.episode}
            </div>
            <Link to={`/episodes/${parseInt(data.episode.id) + 1}`}>
              <Arrow className="arrow-right" />
            </Link>
          </div>
          <div className="episode-detailsPage-header">
            <div className="episode-detailsPage-info">
              <div className="episode-detailsPage-title">
                <div className="episode-detailsPage-title-text">
                  {data.episode.name}
                </div>
              </div>
              <div className="episode-detailsPage-episode">
                <div className="episode-detailsPage-episode-text">
                  {data.episode.episode}
                </div>
              </div>
              <div className="episode-detailsPage-addtofavorite">
                <AddFavorites
                  themeClass="black transparent"
                  favorited={favoritedItems.favoriteEpisodes.includes(
                    parseInt(id.toString())
                  )}
                  toggleFavorite={() => {
                    if (
                      favoritedItems.favoriteEpisodes.includes(
                        parseInt(id.toString())
                      )
                    ) {
                      favoritedItems.removeFavoriteEpisode(
                        parseInt(id.toString())
                      );
                    } else {
                      favoritedItems.addFavoriteEpisode(
                        parseInt(id.toString())
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div className="episode-detailsPage-date">
              <b>Aired:</b> {data.episode.air_date}
            </div>
          </div>
          <div
            className={`episode-detailsPage-description ${
              showMore ? "showMore" : ""
            }`}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
            quisquam officia ex quae ut eius rerum, aperiam quasi debitis eos
            est in asperiores aliquam quos ab perferendis, sed voluptatem nemo!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
            iure deleniti tempora reprehenderit, nulla adipisci hic fugit
            similique ullam magnam excepturi. Quis, eligendi. Similique
            repellendus inventore non laborum modi odit. Nulla, atque culpa.
            Quas illo aliquid porro! Voluptatem consequuntur debitis magnam
            dolores, odio adipisci, illo officiis voluptate dolore cupiditate,
            laudantium possimus expedita quibusdam soluta praesentium ex amet!
            Beatae, corporis nostrum. Consequatur placeat voluptates, officia
            odio optio numquam possimus id a, nulla, nobis quam? Perferendis ad
            in facilis accusantium quibusdam aliquam totam iure repellendus
            praesentium, at sint, ipsam quis earum voluptatibus!
          </div>
          <div className="episode-detailsPage-showMore">
            <button onClick={() => setShowMore(showMore => !showMore)}>
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
      </div>
      <div className="episode-detailsPage-characters">
        <div className="episode-detailsPage-counter">
          <ShowCount
            count={data.episode.characters.length}
            title="Characters"
            href={`/episodes/${id}/characters`}
          />
        </div>
        <div className="episode-detailsPage-characters-container">
          <CharacterList characters={data.episode.characters} count={4} />
        </div>
      </div>
      <div className="episode-detailsPage-locations">
        <div className="episode-detailsPage-counter">
          <ShowCount
            count={uniqueLocations.length}
            title="Locations"
            href="#"
          />
        </div>
        <div className="location-items">
          <div className="location-frame">{uniqueLocations}</div>
        </div>
      </div>
    </div>
  );
}
