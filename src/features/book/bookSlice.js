import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { collection, addDoc, deleteDoc,getDocs, doc } from "firebase/firestore";


const initialState = {
    book : [],
    loading : false,
    error : null,
}

// Reference 
const bookRef = collection(db,'books')

export const addBook = createAsyncThunk('book/addBook',async (book,{rejectWithValue})=>{
    try {
        let docRef = await addDoc(bookRef,book)
        return {...book,id : docRef.id }
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const fetchBook = createAsyncThunk('book/fetchBook',async (_,{rejectWithValue})=>{
    try {
        let snapShot = await getDocs(bookRef)
        return snapShot.docs.map(doc=>({...doc.data(),id : doc.id}))
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deleteBook = createAsyncThunk('book/deleteBook',async (id,{rejectWithValue})=>{
    try {
        const bookRef = doc(db,'books',id)
        await deleteDoc(bookRef)
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})



export const bookSlice = createSlice({
    name : "book",
    initialState,
    extraReducers : (builder)=>{
        // Create
         builder
      .addCase(addBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book.push(action.payload);
      })
      .addCase(addBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch
      .addCase(fetchBook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteBook.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
        .addCase(deleteBook.fulfilled, (state, action) => {
            state.loading = false;
            state.book = state.book.filter(item => item.id !== action.payload);
        })
        .addCase(deleteBook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    },
})

export default bookSlice.reducer;