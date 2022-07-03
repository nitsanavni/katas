import { BehaviorSubject, filter, map, Observable } from "rxjs";

export type Mode = "typing" | "navigating";

export const mode = ({
  key,
  line,
}: {
  key: Observable<string>;
  line: Observable<string>;
}) => {
  const subject = new BehaviorSubject<Mode>("navigating");

  line.pipe(map(() => "navigating" as const)).subscribe(subject);

  key
    .pipe(
      filter((k) => k == "tab"),
      map(() => "typing" as const)
    )
    .subscribe(subject);

  return { mode: subject.asObservable(), get: () => subject.getValue() };
};
