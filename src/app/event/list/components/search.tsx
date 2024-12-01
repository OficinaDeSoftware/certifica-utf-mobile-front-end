import React from "react";
import {
  TextInput,
  View,
  Keyboard,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SearchBarProps {
  clicked: boolean;
  searchPhrase: string;
  setSearchPhrase: (phrase: string) => void;
  setClicked: (clicked: boolean) => void;
}

export default function SearchBar({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}: SearchBarProps) {
  return (
    <View className="flex-row items-center mb-3">
      <View
        className={`flex-row items-center ${
          clicked ? "bg-white w-4/5" : "bg-white w-full"
        }  rounded-lg`}
      >
        <Ionicons name="search" size={20} color="black" className="ml-2" />
        <TextInput
          className="text-lg ml-3 flex-1"
          placeholder="Procurar Evento"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => setClicked(true)}
        />
        {clicked && (
          <TouchableOpacity
            onPress={() => {
              setSearchPhrase("");
            }}
            className="p-1"
          >
            <Ionicons name="close" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>
      {clicked && (
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            setClicked(false);
          }}
          className="ml-2"
        >
          <Text className="text-white text-lg">Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
