alter table public.products
add column if not exists image_urls text[] not null default '{}';

update public.products
set image_urls = array[image_url]
where cardinality(image_urls) = 0;

drop view if exists public.catalog_products;

create view public.catalog_products
with (security_invoker = true) as
select
	p.id,
	p.name,
	c.name as category,
	p.category_id,
	p.price,
	p.badge,
	p.badge_class,
	p.image_url as image,
	case
		when cardinality(p.image_urls) > 0 then p.image_urls
		else array[p.image_url]
	end as images,
	p.description,
	p.light,
	p.container,
	p.winter_hardiness,
	p.in_stock,
	p.is_active,
	p.sort_order,
	p.created_at,
	p.updated_at
from public.products p
join public.categories c on c.id = p.category_id;

grant select on public.catalog_products to anon, authenticated;

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update
set public = excluded.public;
