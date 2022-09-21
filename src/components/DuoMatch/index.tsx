import {
  View,
  Modal,
  ModalProps,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { CheckCircle } from "phosphor-react-native";
import { styles } from "./styles";
import { THEME } from "../../theme";
import { Heading } from "../Heading";
import * as Clipboard from "expo-clipboard";
import { useState } from "react";

interface Props extends ModalProps {
  discord: string;
  onClose: () => void;
}

export function DuoMatch({ discord, onClose, ...rest }: Props) {
  const [isCopying, setIsCopying] = useState(false);

  async function handleCopyDiscordToClipboard() {
    setIsCopying(true);
    await Clipboard.setStringAsync(discord);

    Alert.alert(
      "Discord Copiado",
      "Usuário copiado para colar no Discord."
    );
    setIsCopying(false);
  }

  return (
    <Modal animationType="fade" transparent statusBarTranslucent {...rest}>
      <View style={styles.container}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <MaterialIcons
              name="close"
              size={40}
              color={THEME.COLORS.CAPTION_500}
            />
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold" />

          <Heading
            title="Let's play!"
            subtitle="Agora é ó começar a jogar!"
            style={{ alignItems: "center", marginTop: 24 }}
          />

          <Text style={styles.label}>Adicione seu Discord</Text>

          <TouchableOpacity
            style={styles.discordButton}
            onPress={handleCopyDiscordToClipboard}
            disabled={isCopying}
          >
            <Text style={styles.discord}>{ isCopying ? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
