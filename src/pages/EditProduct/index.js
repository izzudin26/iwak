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
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {
  getCategories,
  saveProduct,
  removeImage,
} from '../../webservice/seller.service';

function EditProduct({navigation, route}) {
  const [images, setImages] = useState([]);
  const {product} = route.params;
  const [savedImage, setSavedImage] = useState(route.params.savedImage);
  const [name, setName] = useState(product.name);
  const [detail, setDetail] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [stock, setStock] = useState(product.stock.toString());
  const [showDialog, setShowDialog] = useState(false);
  const [indexCategory, setIndexCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [doFetch, setFetch] = useState(true);
  const fd = new FormData();

  useEffect(() => {
    if (doFetch) {
      getCategories().then(res => {
        const {data} = res.body;
        setCategories(data);
        data.forEach((c, i) => {
          if (c.id_category == product.category) {
            setIndexCategory(i);
          }
        });
      });
      setFetch(false);
    }
  });

  const handlerSave = () => {
    fd.append('id', product.id);
    fd.append('name', name);
    fd.append('category', categories[indexCategory].id_category);
    fd.append('price', price);
    fd.append('stock', stock);
    fd.append('diskon', 0);
    fd.append('isdiskon', 'N');
    fd.append('description', detail);
    images.forEach((img, i) => {
      const val = {
        uri: img.path,
        type: img.mime,
        name: img.path.split('/').join(''),
      };
      fd.append(`file[${i}]`, val);
    });
    saveProductData(fd);
  };

  const saveProductData = async () => {
    try {
      await saveProduct(fd);
      navigation.navigate('ListProduct');
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const handlerRemoveImageServer = async index => {
    try {
      await removeImage({
        id_image: savedImage[index].imgId,
        id_produk: product.id,
      });
      setSavedImage(oldImage => oldImage.filter((o, i) => i != index));
    } catch (error) {
      alert(error.message);
    }
  };

  const removeUnsaveImage = async index => {
    setImages(oldImage => oldImage.filter((img, i) => i != index));
  };

  const handlerImage = () => {
    ImageCropPicker.openPicker({
      multiple: false,
      mediaType: 'photo',
      cropping: true,
      forceJpg: true,
    })
      .then(res => {
        if (res.width != res.height) {
          alert('Mohon pilih rasio 1:1');
        } else {
          setImages(currentImages => [...currentImages, res]);
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

  const ShowModal = () => (
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
      </View>
    );
  };

  const photos = () => {
    return (
      <ScrollView horizontal={true}>
        {savedImage.map((img, i) => {
          return (
            <View style={styles.imageAddButton} key={img.imgId}>
              <TouchableOpacity>
                <FontAwesome
                  name="times"
                  size={20}
                  color={'red'}
                  style={{
                    position: 'relative',
                    elevation: 20,
                  }}
                  onPress={() => handlerRemoveImageServer(i)}></FontAwesome>
              </TouchableOpacity>
              <Image style={styles.images} source={{uri: img.url}}></Image>
            </View>
          );
        })}
        {images.map((img, i) => {
          return (
            <View style={styles.imageAddButton} key={i}>
              <TouchableOpacity>
                <FontAwesome
                  name="times"
                  size={20}
                  color={'red'}
                  style={{
                    position: 'relative',
                    elevation: 20,
                  }}
                  onPress={() => removeUnsaveImage(i)}></FontAwesome>
              </TouchableOpacity>
              <Image style={styles.images} source={{uri: img.path}}></Image>
            </View>
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
          onPress={handlerSave}
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
          <Text style={{color: '#F0C341', marginLeft: 5, fontSize: 17}}>
            DONE
          </Text>
        </TouchableOpacity>
      </View>
      <ShowModal />
    </ScrollView>
  );
}

export default EditProduct;

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
    flexDirection: 'column',
    marginHorizontal: 5,
    alignSelf: 'center',
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
    elevation: 0,
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
    width: wp('18%'),
    height: wp('18%'),
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
