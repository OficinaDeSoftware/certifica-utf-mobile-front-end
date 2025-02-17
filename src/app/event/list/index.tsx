import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import useEventList from "./hooks/useEventList";
import TitleSection from "./components/titleSection";
import Card from "./components/card";
import SearchBar from "./components/search";
import { EventBasic } from "@/types/EventType";

export default function EventList() {
  const { events, isLoading, error } = useEventList();
  const [clicked, setClicked] = React.useState<boolean>(false);
  const [searchPhrase, setSearchPhrase] = React.useState<string>("");

  console.log("Aqui");
  console.log(events);

  const renderCard = ({ item }: { item: EventBasic }) => {
    if (searchPhrase === "") {
      return <Card event={item} />;
    }

    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Card event={item} />;
    }

    return null;
  };

  return (
    <View className="flex-1 p-8 bg-neutral-700">
      <View className="flex flex-col gap-12">
        <TitleSection />
        <SearchBar
          clicked={clicked}
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          setClicked={setClicked}
        />
      </View>
      {isLoading && (
        <View style={{ flex: 1 }} className="flex items-center justify-center">
          <ActivityIndicator animating={isLoading} size="large" />
        </View>
      )}
      {events.length === 0 && !isLoading ? (
        <View className="flex items-center justify-center flex-1">
          <Text className="text-white text-2xl font-bold">
            Nenhum evento encontrado
          </Text>
        </View>
      ) : error ? (
        <View className="flex items-center justify-center flex-1">
          <Text className="text-white text-2xl font-bold">
            Erro ao carregar
          </Text>
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderCard}
          keyExtractor={(item) => item.idEvent}
        />
      )}
    </View>
  );
}
