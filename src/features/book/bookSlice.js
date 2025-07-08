
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore/lite";

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


export const bookSlice = createSlice({
    name : "book",
    initialState,
    extraReducers : (builder)=>{},
})

export default bookSlice.reducer;
