import React, { useMemo, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Title } from "../../ui/title/title"
import { Loader } from "../../ui/loader/loader"
import { RecommendItem } from "./recommend-item"
import { getRecommendedItems } from "../../services/actions/cart"
import styles from "./recommend.module.css"

export const Recommend = ({ extraClass }) => {
  const { recommendedItems, recommendedItemsRequest } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const content = useMemo(() => {
    return recommendedItemsRequest ? (
      <Loader size="large" />
    ) : (
      recommendedItems.map((item, index) => {
        return <RecommendItem key={index} {...item} />
      })
    )
  }, [recommendedItemsRequest, recommendedItems])
  useEffect(() => {
    dispatch(getRecommendedItems())
  }, [dispatch])

  return (
    <section className={`${styles.container} ${extraClass}`}>
      <Title text="Обычно с этим покупают" amount={(recommendedItems && recommendedItems.length) || ""} />
      <div className={styles.items}>{content}</div>
    </section>
  )
}
