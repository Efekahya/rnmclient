import React, { useContext, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { GetCharacters, GetEpisodes } from "../../queries/queries";

import ShowCount from "../../components/ShowCount";
import CharacterList from "../../components/CharacterList";
import EpisodeCard from "../../components/EpisodeCard";

import { FavoriteContext } from "../../context/favoriteContext";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Home() {
  const [episodesArray, setEpisodesArray] = React.useState<JSX.Element[]>([]);
  const characters = useQuery(GetCharacters, {
    variables: {
      page: 1
    }
  });
  const episodes = useQuery(GetEpisodes, {
    variables: {
      page: 1
    }
  });

  const favoritedItems = useContext(FavoriteContext);

  useEffect(() => {
    if (episodes.loading === false && episodes.data) {
      setEpisodesArray(prevState => {
        prevState = episodes.data.episodes.results.map(
          (
            {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              air_date,
              name,
              id,
              episode
            }: {
              air_date: string;
              name: string;
              id: number;
              episode: string;
            },
            index: number
          ) => {
            if (index < 6) {
              return (
                <div className="homepage-item" key={id}>
                  <EpisodeCard
                    id={id}
                    date={air_date}
                    title={name}
                    episode={episode}
                    description={"lorem ipsum"}
                    favorited={favoritedItems.favoriteEpisodes.includes(
                      parseInt(id.toString())
                    )}
                    handleSetFavorited={() => {
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
              );
            }
          }
        );
        return prevState;
      });
    }
  }, [episodes.data, episodes.loading, favoritedItems]);

  if (characters.loading || episodes.loading) return <LoadingSpinner />;
  if (characters.error || episodes.error) return <p>Error :(</p>;

  return (
    <>
      <div className="homepage-main-frame">
        <div className="homepage-main-container">
          <ShowCount
            count={characters.data.characters.info.count}
            title="Characters"
            href="/characters"
          />
          <div className="homepage-characters">
            <CharacterList
              characters={characters.data.characters.results}
              count={8}
            />
          </div>
          <ShowCount
            count={episodes.data.episodes.info.count}
            title="Episodes"
            href="/episodes"
          />
          <div className="homepage-container">
            <div className="homepage-items">{episodesArray}</div>
          </div>
        </div>
      </div>
    </>
  );
}
