import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { createGlobalStyles } from '../../styles/GlobalStyles';
import HelmetScreen from '../Layout/HelmetScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetGenealogyQuery } from '../../services/type';

interface Member {
  user_id: string;
  name: string;
  parent_id: string;
  status: number;
  children?: Member[];
}

const buildTree = (list: Member[]): Member[] => {
  const map: Record<string, Member> = {};
  const roots: Member[] = [];

  list.forEach(item => {
    map[item.user_id] = { ...item, children: [] };
  });

  list.forEach(item => {
    if (item.parent_id && map[item.parent_id]) {
      map[item.parent_id].children!.push(map[item.user_id]);
    } else {
      roots.push(map[item.user_id]);
    }
  });

  return roots;
};

const TreeNode: React.FC<{ node: Member; onPress: (node: Member) => void }> = ({
  node,
  onPress,
}) => {
  return (
    <View style={styles.nodeContainer}>
      <TouchableOpacity
        onPress={() => onPress(node)}
        style={[
          styles.card,
          {
            borderColor: node.status == 1 ? 'green' : 'red',
          },
        ]}
      >
        <Image
          source={
            node.status == 1
              ? require('../../assets/images/green.png')
              : require('../../assets/images/red.png')
          }
          style={styles.avatar}
        />
        <Text style={styles.userId}>{node.user_id}</Text>
        <Text style={styles.name}>{node.name}</Text>
      </TouchableOpacity>

      {node.children && node.children.length > 0 && (
        <View style={styles.childrenContainer}>
          {node.children.map(child => (
            <TreeNode key={child.user_id} node={child} onPress={onPress} />
          ))}
        </View>
      )}
    </View>
  );
};


const TreeScreen: React.FC = () => {
  const [tooltipData, setTooltipData] = useState<Member | null>(null);
  const style = createGlobalStyles();
  const { data } = useGetGenealogyQuery({});
  const topteam = data?.data?.topteam || {}
const team = data?.data?.team || []
  const combinedData = [topteam, ...team];
  const treeData = buildTree(combinedData);
  return (
    <HelmetScreen>
      <SafeAreaView style={style.container}>
        <View>
          <ScrollView horizontal>
            <View style={styles.treeWrapper}>
              {treeData.map(node => (
                <TreeNode
                  key={node.user_id}
                  node={node}
                  onPress={setTooltipData}
                />
              ))}
            </View>
          </ScrollView>

       
          <Modal
            visible={tooltipData !== null}
            transparent
            animationType="fade"
          >
            <View style={styles.modalBg}>
              <View style={styles.tooltipBox}>
                <Text style={styles.tooltipTitle}>User Details</Text>
                <Text>User ID: {tooltipData?.user_id}</Text>
                <Text>Name: {tooltipData?.name}</Text>
                <Text>
                  Status:{' '}
                  {(tooltipData?.status as any) > 0 ? 'Active' : 'Inactive'}
                </Text>
                <TouchableOpacity
                  onPress={() => setTooltipData(null)}
                  style={styles.closeBtn}
                >
                  <Text style={{ color: '#fff' }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </HelmetScreen>
  );
};

const styles = StyleSheet.create({
  treeWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 20,
  },
  nodeContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  childrenContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: 140,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    elevation: 3,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginBottom: 5,
  },
  userId: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  name: {
    fontSize: 11,
    color: '#555',
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipBox: {
    backgroundColor: '#fff',
    width: 260,
    padding: 20,
    borderRadius: 10,
    elevation: 6,
  },
  tooltipTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  closeBtn: {
    marginTop: 15,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default TreeScreen;
