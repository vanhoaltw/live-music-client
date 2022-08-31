import { db } from "components/firebase/firebase-config";
import { userRole } from "constant/global-constant";
import { useAuth } from "contexts/auth-context";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function useFetchCards({
  status = null,
  name = "",
  filter = "",
  count = 100,
}) {
  const { userInfo } = useAuth();
  console.log("userInfo", userInfo);
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        let colRef = collection(db, "cards");
        if (userInfo?.role === userRole.USER) {
          colRef = query(colRef, where("userId", "==", userInfo?.uid));
        }
        let queries = query(colRef, orderBy("createdAt", "desc"));
        if (status)
          queries = query(queries, where("status", "==", status), limit(count));
        if (name)
          queries = query(
            colRef,
            where("title", ">=", name),
            where("title", "<=", name + "utf8"),
            orderBy("title", "desc"),
            limit(count)
          );
        if (filter)
          queries = query(queries, where("filter", "==", filter), limit(count));
        onSnapshot(queries, (querySnapshot) => {
          const results = [];
          querySnapshot.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });
          setCards(results);
        });
      } catch (err) {
        console.log(err);
        toast.error(err?.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [filter, name, status, count]);
  return {
    cards,
    isLoading: loading,
  };
}
