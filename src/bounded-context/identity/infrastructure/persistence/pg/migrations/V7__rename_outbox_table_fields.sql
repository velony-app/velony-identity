ALTER TABLE public.outbox
  RENAME COLUMN created_at TO enqueued_at;

ALTER TABLE public.outbox
  RENAME COLUMN processed_at TO dispatched_at;

DROP INDEX IF EXISTS idx_outbox_id_processed_at_null;

CREATE INDEX idx_outbox_undispatched_by_id ON public.outbox(id)
WHERE dispatched_at IS NULL;
