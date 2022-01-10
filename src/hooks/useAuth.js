import { gql } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import client from "../utils/apollo/client";
import states from "../utils/apollo/states/states";

/**
 * ### Store user access token in device.
 * @param {string} token User access token.
 */
export const login = async (token) => {
  // Store token in cache memory.
  states?.tokenVar(token);
  // Store in device.
  AsyncStorage.setItem("token", token);
};

/**
 * ### Clear user access token in device.
 */
export const logout = async (userId) => {
  // Clear token in cache memory.
  states.tokenVar(null);
  // Clear in device.
  await AsyncStorage.removeItem("token");
  // Delete cache.
  await client.cache.evict({ id: `User:${userId}` });
};
