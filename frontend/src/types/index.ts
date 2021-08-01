export type Robot = {
  name: string;
  image: string;
  price: string;
  stock: number;
  createdAt: string;
  material: string;
  id: string;
};

export type FetchedRobot = Omit<Robot, "id">;

export type CartItem = {
  id: string;
  quantity: number;
  leftStock: number;
};

export enum LoadingStatus {
  idle = "IDLE",
  pending = "PENDING",
  succeeded = "SUCCEEDED",
  failed = "FAILED",
}
