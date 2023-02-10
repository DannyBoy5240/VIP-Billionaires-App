import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'

export const VectorIcon = React.memo(({ type, name, size, color, style, onPress }) => {
  switch (type) {
    case 'MaterialCommunityIcons':
      return (
        <MaterialCommunityIcons
          name={name}
          size={size}
          color={color}
          style={style}
          onPress={onPress}
        />
      )
    case 'MaterialIcons':
      return (
        <MaterialIcons name={name} size={size} color={color} style={style} onPress={onPress} />
      )
    case 'Ionicons':
      return <Ionicons name={name} size={size} color={color} style={style} onPress={onPress} />
    case 'AntDesign':
      return <AntDesign name={name} size={size} color={color} style={style} onPress={onPress} />
    case 'FontAwesome':
      return <FontAwesome name={name} size={size} color={color} style={style} onPress={onPress} />
    case 'Entypo':
      return <Entypo name={name} size={size} color={color} style={style} onPress={onPress} />
    case 'Feather':
      return <Feather name={name} size={size} color={color} style={style} onPress={onPress}/>
    default:
      return (
        <FontAwesome5 name={name} size={size} color={color} style={style} onPress={onPress} />
      )
  }
})
