import React, {useState, useEffect} from 'react';
import { View, Image,ImageBackground, Text, StyleSheet, TextInput, KeyboardAvoidingView,Platform} from 'react-native';
import { RectButton } from  'react-native-gesture-handler';//botão retangular
import { Feather as Icon} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUPResponse{
  sigla: string;
}

interface IBGECityResponse{
  nome: string;
}

const Home = () =>{
  const [uf,setUf] = useState<string[]>([]);
  const [city, setCity] = useState<string[]>([]);
  const navigation = useNavigation();
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() =>{
    axios.get<IBGEUPResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
        const ufInitials = response.data.map(uf => uf.sigla); 
        
        setUf(ufInitials);
    });
  }, []);

  useEffect(() => {
    // carregar as cidades sempre que a UF mudar
    if(selectedUf === '0'){
        return;
    }


    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`).then(response => {
        const cityNames = response.data.map(cities => cities.nome); 
        
        setCity(cityNames);
    });
  }, [selectedUf]);


  function NavigateToPoints(){
    navigation.navigate('Points');
  }
    
  function handleNavigateToPoints(){
    navigation.navigate('Points',{
      uf: selectedUf,
      city: selectedCity,
    });
  }

  function handleSelectedUf(uf: string){
    setSelectedUf(uf);
}

function handleSelectedCity(city: string){
    setSelectedCity(city);
}

  return(
    ///KeyboardAvoidingView> -> arruma o teclado que sobe para cima
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding': undefined}>
      <ImageBackground source={require('../../assets/home-background.png')} style={styles.container} imageStyle={{width: 274, height:368}}>
          <View style={styles.main}>
              <Image source={require('../../assets/logo.png')} />
              <View>
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
              </View>
          </View>  

          <View style={styles.footer}>
          
            <RNPickerSelect 
              placeholder={{label: 'Selecione a UF'}}
              Icon={() => <Icon name="chevron-down" size={20} color="#6C6C80" />}
              style={{...PickerSelect}}
              onValueChange={(value) => setSelectedUf(value)}
              //style={{...pickerSelectStyles}}
              items={uf.map(uf=>({label: uf, value:uf}))}
              
            />

            <RNPickerSelect 
              placeholder={{label: 'Selecione a Cidade'}}
              Icon={() => <Icon name="chevron-down" size={20} color="#6C6C80" />}
              style={{...PickerSelect}}
              onValueChange={(value) => setSelectedCity(value)}
              items={city.map(city=>({label: city, value: city}))}
              
            />

            
            <RectButton style={styles.button} onPress={handleNavigateToPoints}>
              <View style={styles.buttonIcon}>
                <Text>
                  <Icon name="arrow-right" color="#FFF" size={24}/>
                </Text>
              </View>
              <Text style={styles.buttonText}>
                Entrar
              </Text>
            </RectButton>
          </View>       
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    marginTop: 64,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

const PickerSelect = StyleSheet.create({
  placeholder: {
    fontFamily: 'Roboto_500Medium',
    alignItems: 'center',
    fontSize: 16,
    color: '#6C6C80',
  },
  viewContainer: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    paddingTop: 5,
  },
  iconContainer: {
    padding: 20,
  },
});

export default Home;