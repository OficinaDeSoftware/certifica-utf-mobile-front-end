import { useSession } from "@/src/hooks/auth";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

export default function TitleSection() {
  const { session } = useSession();

  const role = session?.roles?.includes("ROLE_ADMIN") ? "Organizador" : "Aluno";

  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-white text-3xl font-bold">Bem-Vindo {role}</Text>

      <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={40} color="white" />
      </TouchableOpacity>
    </View>
  );
}
