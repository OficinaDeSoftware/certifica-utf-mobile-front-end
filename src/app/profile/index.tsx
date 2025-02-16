import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; 
import Loading from './../../components/loading';
import BackStackScreenButton from "@/src/components/backstackscreenbutton";
import { useSession } from "@/src/hooks/auth";

//comentado para teste
/*interface ProfileProps {
  fetchData: () => Promise<{
    name: string;
    semester: string;
    ra: string;
    email: string;
    course: string;
  }>; // Função para buscar os dados do backend
}*/

const Profile: React.FC/*<ProfileProps>*/ = (/*{ fetchData }*/) => {
  const [data, setData] = useState<{
    name: string | undefined;
    semester: string;
    ra: string | undefined;
    email: string | undefined;
    course: string;
  } | null>(null);

  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null); 
  const { session } = useSession();

  useEffect(() => {
    /*const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchData(); // Chamando a função de busca
        setData(data); // Salvando os dados no estado
      } catch (err) {
        setError('Erro ao carregar os dados do aluno.');
      } finally {
        setLoading(false);
      }
    };*/
    
      try {
        // Dados estáticos para teste
        const staticData = {
          name: session?.name,
          semester: '6º Período',
          ra: session?.nrUuid,
          email: session?.email,
          course: "Não informado",
        };
    //loadData();
  //}, [fetchData]);
  setData(staticData); 
} catch (err) {
  setError('Erro ao carregar os dados do aluno.');  
}finally{
  setLoading(false);
}
}, []);


  if (loading) {
    return <Loading isVisible={loading} />;
  }


  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-900">
        <Text className="text-red-500 text-lg">{error}</Text>
      </View>
    );
  }

  // Exibir os dados do aluno
  if (data) {
    return (
      <View className="flex-1 bg-neutral-700 flex-column">
        {/* Imagem do Aluno */}
        <BackStackScreenButton />
        <View className="items-center mt-16">
          <Image
            source={require('@/assets/images/profile/sem-imagem-avatar.png')} // Substituir pela URL da imagem do backend
            className="w-40 h-40 top-10 rounded-full border-4 border-gray-700"
          />
        </View>

        {/* Nome do Aluno */}
        <Text className="top-10 text-white text-4xl font-semibold text-center mt-4">
          {data.name}
        </Text>

        {/* Semestre */}
        <Text className="top-10 text-gray-400 text-base text-center mt-2">
          {data.semester}
        </Text>

        {/* QR Code */}
        <View className="top-12 items-center mt-10">
          <View className="p-4 bg-white rounded-lg">
            <QRCode value={data.ra} size={180} />       
          </View>
        </View>

        {/* Tabela com informações */}
        <View className="absolute bottom-12 left-6 right-6 bg-neutral-800 rounded-lg p-4">
          <View className="flex-row justify-between border-b border-gray-600 py-5">
            <Text className="text-gray-400 font-semibold">RA:</Text>
            <Text className="text-white">{data.ra}</Text>
          </View>
          <View className="flex-row justify-between border-b border-gray-600 py-5">
            <Text className="text-gray-400 font-semibold">Email:</Text>
            <Text className="text-white">{data.email}</Text>
          </View>
          <View className="flex-row justify-between py-5">
            <Text className="text-gray-400 font-semibold">Curso:</Text>
            <Text className="text-white">{data.course}</Text>
          </View>
        </View>
      </View>
    );
  }

  return null;
};

export default Profile;
