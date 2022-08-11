import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import LabelStatus from "components/label/LabelStatus";
import ButtonAction from "components/button/ButtonAction";
import Button from "components/button/Button";
import useFetchCards from "hooks/useFetchCards";
import { cardStatus } from "constant/global-constant";
import { IconEdit, IconTrash } from "components/icons";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "components/firebase/firebase-config";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import ButtonNew from "components/button/ButtonNew";

const CardManage = (props) => {
  const { cards } = useFetchCards();
  if (cards.length <= 0) return null;

  return (
    <div className="mt-10">
      <ButtonNew href="/manage/new-card"></ButtonNew>
      <div className="table overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Filter</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <CardRow key={card.title} card={card}></CardRow>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="mt-10 text-center">
        <Button>Load more...</Button>
      </div> */}
    </div>
  );
};

const CardRow = ({ card }) => {
  const renderStatus = (status) => {
    switch (status) {
      case cardStatus.APPROVED:
        return <LabelStatus className="bg-green-500">Approved</LabelStatus>;

      default:
        return <LabelStatus className="bg-red-500">Rejected</LabelStatus>;
    }
  };
  const handleDeleteCard = async (id) => {
    try {
      const docRef = doc(db, "cards", id);
      console.log("handleDeleteCard ~ docRef", docRef);
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(docRef);
          toast.success("Delete card successfully");
        }
      });
    } catch (error) {
      toast.error("Delete card failed");
    }
  };
  return (
    <tr>
      <td>{card.title}</td>
      <td className="capitalize">{card.filter}</td>
      <td>{renderStatus(card.status)}</td>
      <td>
        {new Date(card.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}
      </td>
      <td>
        <div className="flex items-center gap-x-5">
          <Link href={`/manage/update-card?id=${card.id}`}>
            <a>
              <ButtonAction className="hover:text-blue-500 hover:border-blue-500">
                <IconEdit></IconEdit>
              </ButtonAction>
            </a>
          </Link>
          <ButtonAction
            className="hover:text-red-500 hover:border-red-500"
            onClick={() => handleDeleteCard(card.id)}
          >
            <IconTrash></IconTrash>
          </ButtonAction>
        </div>
      </td>
    </tr>
  );
};

CardManage.propTypes = {};

export default CardManage;