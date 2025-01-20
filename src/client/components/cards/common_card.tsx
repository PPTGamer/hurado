"use client";

import Link from "next/link";
import { ContestSummaryDTO, ProblemSetSummaryDTO, TaskScoredSummaryDTO, TaskSummaryDTO } from "common/types";
import { getPath, Path } from "client/paths";
import classNames from "classnames";
import styles from "./task_card.module.css";

type CommonCardProps = {
  url: string;
  title: string;
  description: string;
};

export function CommonCard({ url, title, description }: CommonCardProps) {
  return (
    <Link href={url} className="w-[96rem] max-w-full p-4 border border-gray-800 rounded-2xl hover:bg-gray-150">
      <h2 className="text-2xl mb-1">{title}</h2>
      <p className="font-light">
        {description}
      </p>
    </Link>
  );
};


type ProblemSetCardProps = {
  set: ProblemSetSummaryDTO;
};

export function ProblemSetCard({ set }: ProblemSetCardProps) {
  const url = getPath({ kind: Path.ProblemSetView, slug: set.slug });
  return (
    <Link key={set.slug} href={url} className="w-[96rem] max-w-full p-4 border border-gray-800 rounded-2xl hover:bg-gray-150">
      <h2 className="text-2xl mb-1">{set.title}</h2>
      <p className="font-light">
        {set.description ?? "No description was provided for this problem set."}
      </p>
    </Link>
  );
};


type ContestCardProps = {
  contest: ContestSummaryDTO;
};

export function ContestCard({ contest }: ContestCardProps) {
  const url = getPath({ kind: Path.ContestView, slug: contest.slug });
  return (
    <Link key={contest.slug} href={url} className="w-[96rem] max-w-full p-4 border border-gray-800 rounded-2xl hover:bg-gray-150">
      <h2 className="text-2xl mb-1">{contest.title}</h2>
      <p className="font-light">
      {contest.description ?? "No description was provided for this contest."}
      </p>
    </Link>
  );
};


type TaskCardDisplayStyle = "full" | "compact";

type TaskCardProps = {
  task: TaskScoredSummaryDTO;
  display? : TaskCardDisplayStyle;
};

export function TaskCard({ task, display="full" }: TaskCardProps) {
  const url = getPath({ kind: Path.TaskView, slug: task.slug });

  let top_class = classNames(styles["card-top"], "group-hover:bg-gray-150");
  let pbar_class = classNames(styles["card-bar"], styles["card-bar-default"]);
  let pbar_style = {width: "0%"};

  if (task.score_overall == null || task.score_max == null) {   // no attempts
    // pass
  } else if (task.score_overall == 0 || task.score_max == 0) {  // has attempts, binary score
    pbar_class = classNames(styles["card-bar"], "bg-yellow-800")
    pbar_style = { width: "100%" };
  } else { // partial score or accepted
    pbar_class = classNames(styles["card-bar"], "bg-green-400")
    pbar_style = {
      width: `${Math.min(100, Math.max(0, task.score_overall/task.score_max*100))}%`,
    };

    if (task.score_overall == task.score_max)
    {
      top_class = classNames(styles["card-top"], "bg-green-100 group-hover:bg-green-200");
    } 
  }
  return (
    <Link className={classNames("group")} key={task.slug} href={url} >
      <div className={top_class}>
        <h2 className="text-2xl mb-1">{task.title}</h2>
        <p className="font-light">
          {task.description ?? "No description was provided for this task."}
        </p>
      </div>
      <div className={styles["card-bottom"]}>
        <div className={pbar_class} style={pbar_style}></div>
      </div>
    </Link>
  );
};
