import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageCropPicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {saveProduct, getCategories} from '../../webservice/seller.service';

function AddProduct({navigation}) {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState(['iwak']);
  const [indexCategory, setIndexCategory] = useState(null);
  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [isFetch, setFetch] = useState(true);

  useEffect(() => {
    if (isFetch) {
      getCategories().then(res => {
        setCategories(res.body.data);
      });
    }
    setFetch(false);
  });

  const handlerSave = () => {
    let form = new FormData();
    form.append('name', name);
    form.append('category', categories[indexCategory].id_category);
    form.append('price', price);
    form.append('stock', stock);
    form.append('diskon', 0);
    form.append('isdiskon', 'N');
    form.append('description', detail);
    for (let i in images) {
      form.append(`file[${i}]`, {
        name: `${images[i].filename}.jpeg`,
        uri: images[i].path,
        mime: images[i].mime,
      });
    }
    for (let i in images) {
      console.log(i);
      form.append(`file`, {
        name: `${images[i].filename}.jpeg`,
        mime: images[i].mime,
        uri: images[i].path,
      });
    }
    saveProduct(form)
      .then(res => {
        console.log(res);
        if (res.status == 200) {
          alert('Berhasil Menyimpan data');
          navigation.pop();
        } else {
          alert(res.body.message);
        }
      })
      .catch(err => alert(err));
  };

  const handlerImage = () => {
    ImageCropPicker.openPicker({
      cropping: true,
      forceJpg: true,
    })
      .then(res => {
        if (res.width != res.height) {
          alert('Mohon pilih rasio 1:1');
        } else {
          setImages(currentImages => [
            ...currentImages,
            {
              filename: res.filename,
              mime: res.mime,
              path: res.path,
            },
          ]);
        }
      }, 100)
      .catch(err => console.log(err));
  };

  const header = () => {
    return (
      <Text
        style={{
          fontSize: 22,
          color: 'black',
          fontWeight: 'bold',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        fill in your product information in down below.
      </Text>
    );
  };

  const showModal = () => (
    <View>
      <Modal
        isVisible={showDialog}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.cardBody}>
          {categories.map((c, i) => (
            <TouchableOpacity
              key={i}
              style={styles.btnCategories}
              onPress={() => {
                setIndexCategory(i);
                console.log(indexCategory);
                setShowDialog(!showDialog);
              }}>
              <Text style={{color: 'black'}}>{c.category_name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );

  const form = () => {
    return (
      <View>
        <TextInput
          style={styles.form}
          value={name}
          onChangeText={value => setName(value)}
          placeholder="Nama Produk"
          placeholderTextColor="#707070"></TextInput>
        <TouchableOpacity onPress={() => setShowDialog(true)}>
          <TextInput
            editable={false}
            style={styles.form}
            value={
              indexCategory != null
                ? categories[indexCategory].category_name
                : ''
            }
            placeholder="Categories"
            placeholderTextColor="#707070"></TextInput>
        </TouchableOpacity>
        <TextInput
          style={styles.form}
          value={detail}
          onChangeText={value => setDetail(value)}
          placeholder="Detail Produk"
          multiline={true}
          numberOfLines={5}
          placeholderTextColor="#707070"></TextInput>
        <TextInput
          style={styles.form}
          value={price}
          onChangeText={value => setPrice(value)}
          placeholder="Price"
          keyboardType="number-pad"
          placeholderTextColor="#707070"></TextInput>
        <TextInput
          style={styles.form}
          value={stock}
          onChangeText={value => setStock(value)}
          placeholder="Stok"
          keyboardType="numeric"
          placeholderTextColor="#707070"></TextInput>
        {showModal()}
      </View>
    );
  };

  const photos = () => {
    return (
      <ScrollView horizontal={true}>
        {images.map((image, i) => {
          return (
            <TouchableOpacity style={styles.imageAddButton} key={i}>
              <Image style={styles.images} source={{uri: image.path}}></Image>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={styles.imageAddButton} onPress={handlerImage}>
          <Image
            style={styles.image}
            source={require('../../assets/icons/add.png')}></Image>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const photoProduct = () => {
    return (
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
            fontSize: 22,
            color: 'black',
            fontWeight: 'bold',
          }}>
          Photo Product
        </Text>
        <View style={styles.scrollImage}>{photos()}</View>
      </View>
    );
  };

  return (
    <ScrollView>
      <View
        style={{
          alignItems: 'center',
          padding: 25,
          justifyContent: 'center',
        }}>
        {header()}
      </View>
      <View style={styles.containerForm}>{form()}</View>
      <View>{photoProduct()}</View>
      <View style={{paddingVertical: 15}}>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#043C88',
            marginVertical: 20,
            height: 40,
            width: wp('50%'),
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <Text
            style={{color: '#F0C341', marginLeft: 5, fontSize: 17}}
            onPress={handlerSave}>
            DONE
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default AddProduct;

const styles = StyleSheet.create({
  containerForm: {
    alignContent: 'center',
    alignItems: 'center',
  },
  form: {
    color: 'black',
    flexDirection: 'row',
    width: wp('80%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginVertical: 10,
  },
  imageAddButton: {
    marginHorizontal: 5,

    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  scrollImage: {
    width: wp('100%'),
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    padding: 15,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
  },
  images: {
    borderRadius: 10,
    padding: 15,
    width: 60,
    height: 60,
    backgroundColor: '#fff',
  },
  cardBody: {
    padding: 30,
    height: hp('20%'),
    flexWrap: 'wrap',
    borderRadius: 20,
    backgroundColor: '#FFFF',
    width: wp('80%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCategories: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#BBBBBB',
    borderWidth: 1,
    borderRadius: 10,
    width: wp('30%'),
    padding: 5,
    margin: 5,
  },
});
