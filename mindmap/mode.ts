import { filter, map, Observable, Observer } from "rxjs";

export type Mode = "typing" | "navigating";

export const mode = ({
  key,
  line,
  subject,
}: {
  key: Observable<string>;
  line: Observable<string>;
  subject: Observer<Mode>;
}) => {
  line.pipe(map(() => "navigating" as const)).subscribe(subject);

  key
    .pipe(
      filter((k) => k == "e"),
      map(() => "typing" as const)
    )
    .subscribe(subject);
};
