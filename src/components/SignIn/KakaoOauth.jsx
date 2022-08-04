import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import authSlice, {kakaoLogin} from "../../redux/auth-slice"
const KakaoOauth = (props) => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    let code = searchParams.get("code")

    useEffect(async() => {
        console.log(code);
        await dispatch(kakaoLogin(code))
    }, [code])
    return (null)
}

export default KakaoOauth