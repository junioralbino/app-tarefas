import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import {useFonts, Lato_400Regular} from '@expo-google-fonts/lato';
import { StyleSheet, Text, View, ImageBackground, ScrollView, TouchableHighlight, Modal, TouchableOpacity, TextInput } from 'react-native';
import image from './resources/bg.jpg';

export default function App() {

  console.desableyellowBox = true;
  const [tarefaAtual,  setarTarefaAtual] = useState(''); 

  const [tarefas, setarTarefas] = useState([]);

  const [modal, setModal] =  useState(false);

  let [fontsLoaded] = useFonts({
    Lato_400Regular,
  });

  useEffect(() => {
    //alert('carregando tarefas');

    (async () => {
      try{
        let tarefasAtual = await AsyncStorage.getitem('tarefas');
        if(tarefasAtual == null)
          setarTarefas([]);
        else 
        setarTarefas(JSON.parse(tarefaAtual));
      }catch(error){

    }
  })();

}),[];

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function addTarefa (){
    setModal(!modal)
     
    let id = 0;
    if(tarefas.length > 0){
       id = tarefas[tarefas.length-1].id + 1;
    }
    
    let tarefa = {id:id, tarefa:tarefaAtual};

    setarTarefas([...tarefas,tarefa]);
  }

  function detetarTarefa(id){
    alert(id + ' tarefa deteta com sucesso..');
    //deletar tarefa
    let newTarefas = tarefas.filter(function(val){
       return val.id != id;
    })

    setarTarefas(newTarefas);

      
    (async () => {
      try{
         await AsyncStorage.setItem('tarefas', JSON.stringify(newTarefas));
         //console.log('chamado');
      }catch(error){

      }

    })();
  }

  return (
    <ScrollView style={{flex:1}}>
      <StatusBar hidden />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput onChangeText={text => setarTarefaAtual(text)} autoFocus={true}></TextInput>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => addTarefa()} >

              <Text style={styles.textStyle}>Adicionar Tarefa</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>



      <ImageBackground source={image} style={styles.image}>
        <View style={styles.coverView}>
          <Text style={styles.textHeader}>Lista de Tarefa - Junioralbino</Text>
        </View>
      </ImageBackground>
      
      {  
      tarefas.map(function(val){
      return(
      <View style={styles.tarefaSingle}> 
         <View style={{flex:1,width:'100%', padding: 10}}>
           <Text>{val.tarefa}</Text>
         </View>
         <View style={{alignItems:'flex-end', flex:1, padding: 10}}>
           <TouchableOpacity onPress={()=> detetarTarefa(val.id)}><AntDesign name="minuscircleo" size={24} color="black" /></TouchableOpacity>
         </View>
      </View>);
        
       })
      }

         <TouchableOpacity style={styles.btnAddTarefa} onPress={()=>setModal(true)}><Text
         style={{textAlign:'center',color:'white'}}>Adicionar Tarefa!
         </Text>
         </TouchableOpacity>

    </ScrollView>
    );
  }

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 80,
    resizeMode:'cover'
  },
  textHeader: {
    textAlign:'center',
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    fontFamily: 'Lato_400Regular'
  },
  coverView: {
    width: '100%',
    height: 80,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  tarefaSingle: {
    marginTop: 30,
    width: '100%',
    borderBottomWidth:1,
    borderBottomColor:'black',
    flexDirection: 'row',
    paddingBottom: 10 
  },
  //estilo da modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'rgba(0,0,0,0.5)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex:5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  btnAddTarefa: {
    width: 200,
    padding: 8,
    backgroundColor: 'gray',
    marginTop: 20
  }
});


