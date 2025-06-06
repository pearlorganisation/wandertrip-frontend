import { createSlice } from "@reduxjs/toolkit";
import { fetchDestinations } from "../Action/destinationAction";
// import { Destination } from "@/api"; // Make sure this matches your actual Destination type

// Define Pagination type
interface pagination {
  total: number;
  current_page: number;
  limit: number;
  next: number | null;
  prev: number | null;
  pages: number[];
}
export interface Destination {
  _id: string;
  name: string;
  description: string;
  country: string;
  imageKey: string;
  imageUrl: string;
  bannerKey: string;
  bannerUrl: string;
  averageRating: number;
  numberOfRatings: number;
  slug: string;
}

interface DestinationState {
  isloading: boolean;
  error: boolean;
  destinations: Destination[];
  pagination: pagination | null;
  // destination: Destination;
}

const initialState: DestinationState = {
  isloading: false,
  error: false,
  destinations: [],
  pagination: null, // ✅ Fixed `;` to `,`
  // destination: {
  //   _id: "", // You need to provide initial default values for a Destination
  //   name: "",
  //   // Add all required properties of `Destination` here with default values
  // },
};

const destinationSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinations.pending, (state) => {
        state.isloading = true;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.isloading = false;
        state.error = false;

        const { data, pagination } = action.payload;
        state.destinations = data;
        state.pagination = pagination;
      })
      .addCase(fetchDestinations.rejected, (state) => {
        state.isloading = false;
        state.error = true;
      });
  },
});

export default destinationSlice.reducer;
